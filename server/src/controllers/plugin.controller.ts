import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dtos/auth.dto';
import { PluginImportDto, PluginResponseDto, PluginUpdateDto, SearchPluginDto } from 'src/dtos/plugin.dto';
import { Auth, Authenticated } from 'src/middleware/auth.guard';
import { PluginService } from 'src/services/plugin.service';
import { UUIDParamDto } from 'src/validation';

@ApiTags('Plugin')
@Controller('plugins')
@Authenticated()
export class PluginController {
  constructor(private service: PluginService) {}

  @Get()
  searchPlugins(@Auth() auth: AuthDto, @Query() dto: SearchPluginDto): Promise<PluginResponseDto[]> {
    return this.service.search(auth, dto);
  }

  @Post()
  importPlugin(@Auth() auth: AuthDto, @Body() dto: PluginImportDto): Promise<PluginResponseDto> {
    return this.service.import(auth, dto);
  }

  @Put(':id')
  updatePlugin(
    @Auth() auth: AuthDto,
    @Param() { id }: UUIDParamDto,
    @Body() dto: PluginUpdateDto,
  ): Promise<PluginResponseDto> {
    return this.service.update(auth, id, dto);
  }

  @Post(':id/install')
  installPlugin(@Auth() auth: AuthDto, @Param() { id }: UUIDParamDto): Promise<PluginResponseDto> {
    return this.service.install(auth, id);
  }

  @Post(':id/uninstall')
  uninstallPlugin(@Auth() auth: AuthDto, @Param() { id }: UUIDParamDto): Promise<PluginResponseDto> {
    return this.service.uninstall(auth, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePlugin(@Auth() auth: AuthDto, @Param() { id }: UUIDParamDto): Promise<void> {
    return this.service.delete(auth, id);
  }
}
