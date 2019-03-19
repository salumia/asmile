import { TestBed, inject } from '@angular/core/testing';

import { TemplateConfigService } from './template-config.service';

describe('TemplateConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateConfigService]
    });
  });

  it('should be created', inject([TemplateConfigService], (service: TemplateConfigService) => {
    expect(service).toBeTruthy();
  }));
});
