import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class SharedCoreApiModule {
  static forRoot(): ModuleWithProviders<SharedCoreApiModule> {
    return {
      ngModule: SharedCoreApiModule,
    };
  }
}
