import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenAuthService} from "@homecare-nx/auth";
import {SubscribedContainer} from "@homecare/shared";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'hc-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends SubscribedContainer implements OnInit {

  form: FormGroup;

  public isLoading: boolean;

  public error: string;

  constructor(private fb: FormBuilder, public authService: TokenAuthService) {

    super();

    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.authService.isLoggingIn$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(isLoggingIn => this.isLoading = isLoggingIn);

    this.authService.loginError$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(error => {

      if (error) {
        this.error = this.parseError(error);
      } else {
        this.error = null;
      }
    });

  }

  parseError(error): string {
    try {
      const errorObj = JSON.parse(error);
      if (errorObj?.message) {
        return errorObj.message;
      }
    } catch (ex) {
    }
    return 'Login failed, please check credentials and your internet connection and try again.'
  }

  ngOnInit(): void {
  }

  submit() {
    const dto = this.form.value;
    this.authService.login(dto.username, dto.password);
  }

}
