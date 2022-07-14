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

export const initSchedData: ScheduleDataInterface[] = [
  {
    name: 'monday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
  {
    name: 'tuesday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
  {
    name: 'wednesday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
  {
    name: 'thursday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
  {
    name: 'friday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
  {
    name: 'saturday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
  {
    name: 'sunday',
    isActive: 1,
    schedule: [
      {
        from: '00:00',
        to: '23:59',
      },
    ],
  },
];
