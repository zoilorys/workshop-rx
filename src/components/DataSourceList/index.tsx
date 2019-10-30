import React from 'react';
import cn from 'classnames';
import { DataSource } from '../../models/DataSource';

const styles = require('./DataSourceList.module.scss');

type InputProps = {
  source: DataSource
};

const DataSourceList = ({ source }: InputProps) => (
  <div className={cn(styles['wrapper'])}>{source.id}</div>
);

export default DataSourceList;
