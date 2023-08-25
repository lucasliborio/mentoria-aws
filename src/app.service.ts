import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AGORA SUBIU COM GIT HUB ACITIONS';
  }
}
