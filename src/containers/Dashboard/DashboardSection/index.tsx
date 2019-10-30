import React, { ReactNode, ReactNodeArray } from 'react';
import cn from 'classnames';
const styles = require('./DashboardSection.module.scss');

type InputProps = {
  title: ReactNode;
  children: ReactNode | ReactNodeArray;
};

const DashboardSection = ({ title, children }: InputProps) => (
  <div className={cn(styles['section'])}>
    <div className={cn(styles['section-header'])}>{title}</div>
    <div className={cn(styles['section-list'])}>{children}</div>
  </div>
);

export default DashboardSection;
