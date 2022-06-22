import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from '../metrics.service';
import { HealthService } from '../../../health/commands/health.service';
import { PrometheusService } from '../../../prometheus/commands/prometheus.service';
describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [HealthService, PrometheusService],
      providers: [
        MetricsService,
        {
          provide: HealthService,
          useValue: {},
        },
        {
          provide: PrometheusService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
