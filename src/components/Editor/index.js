import React from 'react';

import ISimpleMDE from 'react-simplemde-v1';
import 'simplemde/dist/simplemde.min.css';
 
export const Editor = ({ setContet }) => {
  const option = {};
 
  const onReady = (instance) => console.log(instance.value());
 
  const onEvents = {
    change(setContet) {
      // the 'this' variable can get SimpleMDE instance
      this.setContet(this.value());
    },
  };
 
  return (
    <ISimpleMDE
      option={option}
      onReady={onReady}
      onEvents={() => {
        onEvents.change(setContet);
        return onEvents;
      }}
    />
  );
}