import { Controller } from '@nestjs/common';
import { WatchListService } from './watch-list.service';

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}
}
