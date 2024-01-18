/*
 * This module imports and re-exports all Angular Material modules for convenience,
 * so only 1 module import is needed in your feature modules.
 * See https://material.angular.io/guide/getting-started#step-3-import-the-component-modules.
 *
 * To optimize your production builds, you should only import the components used in your app.
 */

// uncomment the modules you want to use
import { NgModule } from "@angular/core";
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatCommonModule, MatOptionModule, MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CarouselModule } from "ngx-owl-carousel-o";
import { CustomIconModule } from "@app/models/enums/amaze-material-icons.enums";

@NgModule({
	exports: [
		PortalModule,
		MatCommonModule,
		MatButtonModule,
		MatCheckboxModule,
		MatChipsModule,
		MatBadgeModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		CustomIconModule,
		MatInputModule,
		MatMenuModule,
		MatOptionModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatTreeModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatStepperModule,
		MatListModule,
		MatAutocompleteModule,
		MatPaginatorModule,
		MatButtonToggleModule,
		MatSlideToggleModule,
		MatCardModule,
		MatSliderModule,
		MatSortModule,
		MatTableModule,
		DragDropModule,
		CarouselModule
	]
})
export class MaterialModule {}
