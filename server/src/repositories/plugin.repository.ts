import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFile } from 'node:fs/promises';
import { PluginEntity } from 'src/entities/plugin.entity';
import { IPluginRepository, PluginLike, PluginSearchOptions } from 'src/interfaces/plugin.interface';
import { ImmichLogger } from 'src/utils/logger';
import { Repository } from 'typeorm';

@Injectable()
export class PluginRepository implements IPluginRepository {
  private logger = new ImmichLogger(PluginRepository.name);
  constructor(@InjectRepository(PluginEntity) private repository: Repository<PluginEntity>) {}

  search(options: PluginSearchOptions): Promise<PluginEntity[]> {
    return this.repository.find({
      where: {
        id: options.id,
        packageId: options.namespace,
        version: options.version,
        name: options.name,
        isEnabled: options.isEnabled,
        isInstalled: options.isInstalled,
        isTrusted: options.isOfficial,
      },
    });
  }

  create(dto: Partial<PluginEntity>): Promise<PluginEntity> {
    return this.repository.save(dto);
  }

  get(id: string): Promise<PluginEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  update(dto: Partial<PluginEntity>): Promise<PluginEntity> {
    return this.repository.save(dto);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async download(url: string, downloadPath: string): Promise<void> {
    try {
      const { json } = await fetch(url);
      await writeFile(downloadPath, await json());
    } catch (error) {
      this.logger.error(`Error downloading the plugin from ${url}. ${error}`);
    }
  }

  load(pluginPath: string): Promise<PluginLike> {
    return import(pluginPath);
  }
}
