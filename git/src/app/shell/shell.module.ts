// Angular modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

// Translation modules
import { TranslateModule } from "@ngx-translate/core";

// Ui Frameworks modules and componenets
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/modules/material.module";

import { PluginsModule } from "@app/modules/plugins.module";
import { ShellRoutingModule } from "./shell-routing.module";

// Components
import { ShellComponent } from "@app/shell/shell.component";
import { SideNavComponent } from "@app/partials/sideNav/sideNav.component";
import { HeaderComponent } from "@app/partials/header/header.component";
import { FooterComponent } from "@app/partials/footer/footer.component";
import { LockScreenComponent } from "@app/partials/lockscreen/lock-screen.component";
import { LanguageSelectorComponent } from "@app/partials/language-selector/language-selector.component";

// Partial Popups
import { DialogComponent } from "@app/components/dialog/dialog.component";
import { ConfirmDialogComponent } from "@app/components/confirmdialog/confirm-dialog.component";
import { AmazeCatalogSelectorModule } from "@app/components/amaze-catalog-selector/amaze-catalog-selector.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		FlexLayoutModule,
		SharedModule,
		MaterialModule,

		PluginsModule,
		RouterModule,
		ShellRoutingModule,
		AmazeCatalogSelectorModule
	],
	exports: [],
	providers: [],
	declarations: [ShellComponent, SideNavComponent, HeaderComponent, FooterComponent, LockScreenComponent, LanguageSelectorComponent, DialogComponent, ConfirmDialogComponent],
	entryComponents: [DialogComponent, ConfirmDialogComponent]
})
export class ShellModule {}
