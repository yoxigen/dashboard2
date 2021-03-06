import {Component} from "angular2/core";
import {DashboardModel} from "../dashboard/models/DashboardModel";
import {DashboardsService} from "../dashboard/services/DashboardsService";
import {DashboardComponent} from "../dashboard/components/DashboardComponent";
import {RouteParams} from "angular2/router";

@Component({
	selector: "dashboard-page",
	directives: [DashboardComponent],
	template: `
		<dashboard [dashboard]="currentDashboard" *ngIf="currentDashboard"></dashboard>
	`
})
export class DashboardPageComponent{
	currentDashboard:DashboardModel;
	allDashboards:DashboardModel[];
	dashboardId:string;

	constructor(dashboardsService:DashboardsService, params: RouteParams){
		var app = this;

		dashboardsService.getDashboards().then(function(dashboards){
			app.allDashboards = dashboards;
		});

		this.dashboardId = params.get('dashboardId');
		dashboardsService.getDashboardById(this.dashboardId).then(dashboard => {
			this.currentDashboard = dashboard;
		});
	}

	setDashboard(dashboard:DashboardModel){
		this.currentDashboard = dashboard;
	}

}