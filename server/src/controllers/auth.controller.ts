import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as crypto from 'node:crypto';
import { AuthType } from 'src/constants';
import {
  AuthDto,
  ChangePasswordDto,
  ImmichCookie,
  LoginCredentialDto,
  LoginResponseDto,
  LogoutResponseDto,
  SignUpDto,
  ValidateAccessTokenResponseDto,
} from 'src/dtos/auth.dto';
import { UserAdminResponseDto } from 'src/dtos/user.dto';
import { Auth, Authenticated, GetLoginDetails } from 'src/middleware/auth.guard';
import { AuthService, LoginDetails } from 'src/services/auth.service';
import { respondWithCookie, respondWithoutCookie } from 'src/utils/response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(
    @Body() loginCredential: LoginCredentialDto,
    @Res({ passthrough: true }) res: Response,
    @GetLoginDetails() loginDetails: LoginDetails,
  ): Promise<LoginResponseDto> {
    const body = await this.service.login(loginCredential, loginDetails);
    return respondWithCookie(res, body, {
      isSecure: loginDetails.isSecure,
      values: [
        { key: ImmichCookie.ACCESS_TOKEN, value: body.accessToken },
        { key: ImmichCookie.AUTH_TYPE, value: AuthType.PASSWORD },
        { key: ImmichCookie.IS_AUTHENTICATED, value: 'true' },
      ],
    });
  }

  @Post('admin-sign-up')
  signUpAdmin(@Body() dto: SignUpDto): Promise<UserAdminResponseDto> {
    return this.service.adminSignUp(dto);
  }

  @Post('validateToken')
  @HttpCode(HttpStatus.OK)
  @Authenticated()
  validateAccessToken(): ValidateAccessTokenResponseDto {
    return { authStatus: true };
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @Authenticated()
  changePassword(@Auth() auth: AuthDto, @Body() dto: ChangePasswordDto): Promise<UserAdminResponseDto> {
    return this.service.changePassword(auth, dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Authenticated()
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
    @Auth() auth: AuthDto,
  ): Promise<LogoutResponseDto> {
    const authType = (request.cookies || {})[ImmichCookie.AUTH_TYPE];

    const body = await this.service.logout(auth, authType);
    return respondWithoutCookie(res, body, [
      ImmichCookie.ACCESS_TOKEN,
      ImmichCookie.AUTH_TYPE,
      ImmichCookie.IS_AUTHENTICATED,
    ]);
  }

  @Get('validate-license')
  validateLicense(@Body() dto: { licenseKey: string }) {
    console.log(dto);
    const publicKey =
      'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUE3Sy8yd3ZLUS9NdU8ydi9MUm5saAoyUy9zTHhDOGJiTEw1UUlKOGowQ3BVZW40YURlY2dYMUpKUmtGNlpUVUtpNTdTbEhtS3RSM2JOTzJmdTBUUVg5Ck5WMEJzVzllZVB0MmlTMWl4VVFmTzRObjdvTjZzbEtac01qd29RNGtGRGFmM3VHTlZJc0dMb3UxVWRLUVhpeDEKUlRHcXVTb3NZVjNWRlk3Q1hGYTVWaENBL3poVXNsNGFuVXp3eEF6M01jUFVlTXBaenYvbVZiQlRKVzBPSytWZgpWQUJvMXdYMkVBanpBekVHVzQ3Vko4czhnMnQrNHNPaHFBNStMQjBKVzlORUg5QUpweGZzWE4zSzVtM00yNUJVClZXcTlRYStIdHRENnJ0bnAvcUFweXVkWUdwZk9HYTRCUlZTR1MxMURZM0xrb2FlRzYwUEU5NHpoYjduOHpMWkgKelFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tDQo=';
    const licenseKey = 'TN6F-4DN5-733W-24VT-NC6P-D49S-WPX6-SDK4';
    const activationKey =
      'x2BH8Oq-pPtSxkNv1yexzTJELTW8fblk_VZmYHsrV7aJ3s79RPsfk547JSmtmTWAv28Bmw5m8rTxutYxNX7ws6ysysqHg0OinRBykH_LJHNbURzSjrmDXOffbFQWchqnuSXZYt-SN5rpI_2sZDlUxZ72wkhhrrKUb3UQXHhsQt6MQNnumgLfswvJQVKnvhJ3tzHEDYOHuKo4w-p0l7rIi0WRUWW2FrNOIh9HrvccEBLIwfIWjKz9xIJaN-Qwp0xYuwUqQ-p5jJn6XqEXWUQmRer8RWxk589qiTi238MMG_YvkTRd68Iqn10OyxJ4N0ua0qXS64xhgK5dfCsEVQfCMA';

    const publicKeyBuffer = Buffer.from(publicKey, 'base64');
    const publicPaymentKey = crypto.createPublicKey({
      key: publicKeyBuffer,
      type: 'spki',
      format: 'pem',
    });

    const verifier = crypto.createVerify('SHA256');
    verifier.update(licenseKey);
    verifier.end();

    const activationKeyBuffer = Buffer.from(activationKey, 'base64');
    return verifier.verify(publicPaymentKey, activationKeyBuffer);
  }
}
