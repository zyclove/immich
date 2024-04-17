import { Inject, Injectable } from '@nestjs/common';
import { IWorkflowTriggerJob, JobStatus, WorkflowTriggerType } from 'src/interfaces/job.interface';
import { IPluginRepository, PluginLike } from 'src/interfaces/plugin.interface';

@Injectable()
export class WorkflowService {
  private plugins?: PluginLike[];
  constructor(@Inject(IPluginRepository) private pluginRepository: IPluginRepository) {}

  async init(): Promise<void> {
    const activePlugins = await this.pluginRepository.search({ isEnabled: true });
    this.plugins = await Promise.all(activePlugins.map(({ installPath }) => this.pluginRepository.load(installPath)));
  }

  // async register() {
  //   const plugins = ['/src/abc'];
  //   for (const pluginModule of plugins) {
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     try {
  //       const plugin: Plugin = ;
  //       const actions = await plugin.register();
  //       for (const action of actions) {
  //         this.actions[action.id] = action;
  //       }
  //     } catch (error) {
  //       console.error(`Unable to load module: ${pluginModule}`, error);
  //       continue;
  //     }
  //   }
  // }

  async handleTrigger(data: IWorkflowTriggerJob): Promise<JobStatus> {
    if (data.type === WorkflowTriggerType.ASSET_UPLOAD) {
      // const stuff = data.data;
      return JobStatus.SUCCESS;
    }

    await Promise.resolve();

    // const workflows = this.getWorkflows();
    // const plugins = await this.getPlugins();

    // for (const plugin of plugins) {
    //   if (workflow.trigger === data.type) {
    //   }
    // }

    return JobStatus.SKIPPED;
  }
}
