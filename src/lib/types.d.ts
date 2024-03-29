export type SidewalkPoint = {
	imgName: string;
	lat: number;
	lng: number;
	dataTime: Date;
	remark: string;
	uploader: string;
	marker: string;
	checker: string;
	label: string;
	createdAt: Date;
	updatedAt: Date;
	sidewalk: string;
	protective: string;
	wheelchair: string;
	occupation: string;
	walkRisk: string;
	riskRate: string;
	purpose: string;
	imgUrl: string;
	_id: string;
	rankA1: number;
	rankB1: number;
	rankC1: number;
	countyName: string;
	townName: string;
	villName: string;
	villCode: string;
};

export type LatLng = [number, number];

export type EventPoint = {
	event_id: number;
	accident_category_name: string;
	latitude: string;
	longitude: string;
	number_of_deaths: number;
	number_of_injuries: number;
	occurrence_date: Date;
};

// export type EventPoint = {
// 	event_id: number;
// 	accident_category_name: string;
// 	occurrence_date: Date;
// 	longitude: string;
// 	latitude: string;
// 	color: string;
// };

export type EventGeneral = {
	event_id: number;
	occurrence_date: Date;
	longitude: number;
	latitude: number;
	accident_category_name: string;
	handling_unit_name_police_department_level: string;
	location: string;
	weather_name: string;
	lighting_name: string;
	road_category_first_party_name: string;
	speed_limit_first_party: number;
	road_type_main_category_name: string;
	road_type_sub_category_name: string;
	accident_location_main_category_name: string;
	accident_location_sub_category_name: string;
	road_condition_paving_name: string;
	road_condition_surface_status_name: string;
	road_condition_surface_defect_name: string;
	road_obstacle_obstacle_name: string;
	road_obstacle_visibility_quality_name: string;
	road_obstacle_visibility_name: string;
	traffic_light_signal_type_name: string;
	traffic_light_signal_action_name: string;
	lane_division_facility_main_category_name: string;
	lane_division_facility_sub_category_name: string;
	lane_division_facility_fast_lane_or_general_lane_name: string;
	lane_division_facility_fast_slow_lane_name: string;
	lane_division_facility_road_edge_line_name: string;
	accident_type_and_category_main_category_name: string;
	accident_type_and_category_sub_category_name: string;
	cause_classification_main_category_name_primary: string;
	cause_classification_sub_category_name_primary: string;
	number_of_deaths: number;
	number_of_injuries: number;
};

export type EventGeneralView = {
	event_id: number;
	occurrence_date: Date;
	longitude: number;
	latitude: number;
	accident_category_name: string;
	handling_unit_name_police_department_level: string;
	location: string;
	accident_location_sub_category_name: string;
	road_obstacle_obstacle_name: string;
	road_obstacle_visibility_quality_name: string;
	road_obstacle_visibility_name: string;
	traffic_light_signal_type_name: string;
	traffic_light_signal_action_name: string;
	accident_type_and_category_main_category_name: string;
	accident_type_and_category_sub_category_name: string;
	cause_classification_main_category_name_primary: string;
	cause_classification_sub_category_name_primary: string;
	number_of_deaths: number;
	number_of_injuries: number;
};

export type EventDetail = {
	detail_event_id: number;
	event_id: number;
	party_order: number;
	party_classification_category_main_category_name_vehicle: string;
	party_classification_category_sub_category_name_vehicle: string;
	party_gender_name: string;
	party_age_at_time_of_accident: number;
	protective_equipment_name: string;
	mobile_phone_or_computer_or_other_similar_device_name: string;
	party_action_status_main_category_name: string;
	party_action_status_sub_category_name: string;
	vehicle_impact_location_main_category_name_initial: string;
	vehicle_impact_location_sub_category_name_initial: string;
	vehicle_impact_location_main_category_name_other: string;
	vehicle_impact_location_sub_category_name_other: string;
	cause_classification_main_category_name_individual: string;
	cause_classification_sub_category_name_individual: string;
	hit_and_run_category_name: string;
};

export type EventDetailView = {
	event_id: number;
	party_order: number;
	party_classification_category_main_category_name_vehicle: string;
	party_classification_category_sub_category_name_vehicle: string;
	party_gender_name: string;
	party_age_at_time_of_accident: number;
	protective_equipment_name: string;
	mobile_phone_or_computer_or_other_similar_device_name: string;
	party_action_status_sub_category_name: string;
	vehicle_impact_location_main_category_name_initial: string;
	vehicle_impact_location_sub_category_name_initial: string;
	cause_classification_main_category_name_individual: string;
	cause_classification_sub_category_name_individual: string;
	hit_and_run_category_name: string;
};

export type DotTaipeiPoint = {
	imgName: string;
	lat: number;
	lng: number;
	dataTime: Date;
	remark: string;
	uploader: string;
	marker: string;
	checker: string;
	label: string;
	createdAt: Date;
	updatedAt: Date;
	sidewalk: string;
	protective: string;
	wheelchair: string;
	occupation: string;
	walkRisk: string;
	riskRate: string;
	purpose: string;
	imgUrl: string;
	_id: string;
	rankA1: number;
	rankB1: number;
	rankC1: number;
	countyName: string;
	townName: string;
	villName: string;
	villCode: string;
};

export type DotTaipeiImage = {
	resourcePath: string;
	description: string;
	timestamp: number;
};

export type DotTaipeiPoint = {
	title: string;
	description: string;
	lat: number;
	lng: number;
	images: DotTaipeiImage[];
	author: string;
	type: string;
};
