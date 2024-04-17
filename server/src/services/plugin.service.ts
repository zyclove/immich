import { BadRequestException, Inject } from '@nestjs/common';
import { AccessCore, Permission } from 'src/cores/access.core';
import { AuthDto } from 'src/dtos/auth.dto';
import { PluginImportDto, PluginUpdateDto, SearchPluginDto, mapPlugin } from 'src/dtos/plugin.dto';
import { IAccessRepository } from 'src/interfaces/access.interface';
import { IPluginRepository, Plugin, PluginFactory } from 'src/interfaces/plugin.interface';

export class PluginService {
  private access: AccessCore;
  constructor(
    @Inject(IPluginRepository) private pluginRepository: IPluginRepository,
    @Inject(IAccessRepository) accessRepository: IAccessRepository,
  ) {
    this.access = AccessCore.create(accessRepository);
  }

  search(auth: AuthDto, dto: SearchPluginDto) {
    // await this.access.requirePermission(authUser, Permission.PLUGIN_READ);
    return this.pluginRepository.search(dto);
  }

  async import(auth: AuthDto, dto: PluginImportDto) {
    // await this.access.requirePermission(authUser, Permission.PLUGIN_ADMIN);
    if (dto.url.startsWith('http')) {
      //
    }

    const pluginPath = '/path/to/plugin';
    await this.pluginRepository.download(dto.url, pluginPath);
    const { version, id, name, description } = await this.load(pluginPath);

    const response = await this.pluginRepository.create({
      version,
      packageId: id,
      name,
      description,
      isInstalled: false,
      isEnabled: dto.isEnabled,
      isTrusted: false,
      installPath: pluginPath,
    });

    return mapPlugin(response);
  }

  async install(auth: AuthDto, id: string) {
    await this.access.requirePermission(auth, Permission.PLUGIN_INSTALL, id);
    // TODO
    return this.pluginRepository.update({ id, isInstalled: true });
  }

  async uninstall(auth: AuthDto, id: string) {
    await this.access.requirePermission(auth, Permission.PLUGIN_UNINSTALL, id);
    // TODO
    return this.pluginRepository.update({ id, isInstalled: false, installPath: null });
  }

  async update(auth: AuthDto, id: string, dto: PluginUpdateDto) {
    await this.access.requirePermission(auth, Permission.PLUGIN_WRITE, id);
    return this.pluginRepository.update({
      id,
      isEnabled: dto.isEnabled,
    });
  }

  async delete(auth: AuthDto, id: string) {
    await this.access.requirePermission(auth, Permission.PLUGIN_WRITE, id);
    await this.findOrFail(id);
    await this.pluginRepository.delete(id);
  }

  private async findOrFail(id: string) {
    const plugin = await this.pluginRepository.get(id);
    if (!plugin) {
      throw new BadRequestException('Plugin not found');
    }
    return plugin;
  }

  // TODO security implications
  private async load(pluginPath: string): Promise<Plugin> {
    const pluginLike = await this.pluginRepository.load(pluginPath);
    let plugin: Plugin | undefined;

    const pluginModule = pluginLike as { default: Plugin };
    if (pluginModule.default) {
      plugin = pluginModule.default;
    }

    const pluginExport = pluginLike as { plugin: Plugin };
    if (pluginExport.plugin) {
      plugin = pluginExport.plugin;
    }

    const pluginFactory = pluginLike as PluginFactory;
    if (pluginFactory) {
      plugin = await pluginFactory.register();
    }

    // TODO use class-validator
    const isPlugin = plugin && !!plugin.version && Array.isArray(plugin.actions);
    if (isPlugin) {
      return plugin as Plugin;
    }

    throw new Error('Unable to load plugin');
  }
}
