import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { $user, setUserVk } from './store/user';
import { useUnit } from 'effector-react';
import { setUserServerFx } from './api/user';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const user = useUnit($user);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUserVk(user);
      setUserServerFx(user.id);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout >
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
