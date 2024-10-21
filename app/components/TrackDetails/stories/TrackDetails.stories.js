/**
 *
 * Stories for TrackDetails
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { TrackDetails } from '../index';

export default {
    title: 'TrackDetails',
    component: TrackDetails,
  };
  
  const Template = (args) => <TrackDetails {...args} />;
  
  export const Default = Template.bind({});
  Default.args = {};