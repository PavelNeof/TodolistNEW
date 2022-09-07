import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";
import {EditableSpan} from "../EditableSpan";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../reducers/store";
import {ReduxStoreProviderDecorator} from "../components/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

    export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

