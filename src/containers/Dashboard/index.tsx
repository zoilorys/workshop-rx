import React, { useCallback, useState } from 'react';
import cn from 'classnames';

import DataSourceList from 'components/DataSourceList';
import WidgetAddModal from 'containers/WidgetAddModal';

import DashboardSection from './DashboardSection';

import { DataSource } from 'models/DataSource';
import { WidgetConfig } from 'models/WidgetConfig';
import useDataSource from 'hooks/useDataSource';

import dataSource$ from 'data-streams/dataSource';
import widget$ from 'data-streams/widget';
import appState$ from 'data-streams/appState';

const styles = require('./Dashboard.module.scss');

const Dashboard = () => {
  const dataSources = useDataSource<DataSource[]>(dataSource$);
  const widgets = useDataSource<WidgetConfig[]>(widget$);
  const addSource = useCallback(() => appState$.next('add-source-intent'), [appState$]);
  const addWidget = useCallback(() => appState$.next('add-widget-intent'), [appState$]);

  const [checked, setChecked] = useState(false);

  return (
    <div className={cn(styles['wrapper'])}>
      <DashboardSection
        title={
          <>
            Sources{' '}
            <button type="button" onClick={addSource}>
              Add
            </button>
          </>
        }
      >
        {dataSources.map(s => (
          <DataSourceList key={s.id} source={s} />
        ))}
      </DashboardSection>
      <DashboardSection
        title={
          <>
            Widgets{' '}
            <button type="button" onClick={addWidget}>
              Add
            </button>
          </>
        }
      >
        {widgets.map(w => (
          <>{JSON.stringify(w)}</>
        ))}
      </DashboardSection>

      <input type={'checkbox'} checked={checked} onChange={evt => setChecked(evt.target.checked)} />
      {checked ? <WidgetAddModal /> : null}
    </div>
  );
};

export default Dashboard;
