import React, { useState, useEffect, useContext } from 'react';
import Button from '../components/Button';
import NotificationContext from '../context/NotificationContext';
import {
  ScheduleDataInterface,
  initSchedData,
  WebBlockerSchedule,
} from '../../types/types';

const ScheduleBlocking = () => {
  const { notificationHandler } = useContext(NotificationContext);
  const [scheduleData, setScheduleData] = useState<ScheduleDataInterface[]>([]);
  const onCheck = (item: ScheduleDataInterface, index: number) => {
    let filter = scheduleData.filter((data) => data !== item);
    let copyItem = item;
    copyItem.isActive = item.isActive ? 0 : 1;
    filter.splice(index, 0, copyItem);
    setScheduleData(filter);
  };

  const timeScheduleHandler = (
    schedule: ScheduleDataInterface,
    scheduleIndex: number,
    timeIndex: number,
    type: 'from' | 'to',
    value: string
  ) => {
    let filterSchedule = scheduleData.filter((data) => data !== schedule);
    let copySchedule = schedule;
    copySchedule.schedule[timeIndex][type] = value;
    filterSchedule.splice(scheduleIndex, 0, copySchedule);
    setScheduleData(filterSchedule);
  };

  const applySchedule = async () => {
    notificationHandler({
      type: 'success',
      message: 'Schedule updated',
    });
    await chrome.storage.sync.set({
      WebsiteBlockerSchedule: scheduleData,
    });
  };

  const getData = async () => {
    let data: WebBlockerSchedule = await chrome.storage.sync.get(
      'WebsiteBlockerSchedule'
    );
    if (data.WebsiteBlockerSchedule) {
      setScheduleData(data.WebsiteBlockerSchedule);
    } else {
      setScheduleData(initSchedData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>Schedule Blocking:</h2>
      <div className='scheduleWrap'>
        {scheduleData.map((item, index) => {
          return (
            <div className='scheduleItemWrap' key={index}>
              <div className='scheduleItemCheckboxWrap'>
                <input
                  checked={!!item.isActive}
                  type='checkbox'
                  name={item.name}
                  id={item.name}
                  value={item.isActive}
                  onChange={() => onCheck(item, index)}
                />
                <label htmlFor={item.name} className='scheduleLabel'>
                  {item.name}
                </label>
              </div>

              {item.isActive !== 0 &&
                item.schedule.map((time, key) => {
                  return (
                    <div className='scheduleItemTime' key={key}>
                      <label htmlFor={`from_${item.name}_${key}`}>From:</label>
                      <input
                        type='time'
                        className='input'
                        name={`from_${item.name}_${key}`}
                        id={`from_${item.name}_${key}`}
                        value={time.from}
                        onChange={(e) =>
                          timeScheduleHandler(
                            item,
                            index,
                            key,
                            'from',
                            e.target.value
                          )
                        }
                      />
                      <label htmlFor={`to_${item.name}_${key}`}>To:</label>
                      <input
                        type='time'
                        className='input'
                        name={`to_${item.name}_${key}`}
                        id={`to_${item.name}_${key}`}
                        value={time.to}
                        onChange={(e) =>
                          timeScheduleHandler(
                            item,
                            index,
                            key,
                            'to',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <Button className='applyScheduleBtn' onClick={applySchedule}>
        Apply Schedule
      </Button>
    </>
  );
};
export default ScheduleBlocking;
