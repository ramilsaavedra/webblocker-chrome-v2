export interface WebBlockerData {
  WebsiteBlockerBlock?: string[];
}

export interface WebBlockerRedirect {
  WebsiteBlockerRedirect?: string;
}

export interface WebBlockerSchedule {
  WebsiteBlockerSchedule?: ScheduleDataInterface[];
}

export interface TimeDataInterface {
  from: string;
  to: string;
}

export interface ScheduleDataInterface {
  name:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';
  isActive: 0 | 1;
  schedule: TimeDataInterface[];
}
