import React from 'react';
import PropTypes from 'prop-types';
import { Scene, Tabs, Stack, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';
import DefaultProps from '../constants/navigation';

import { ArticlesForm, ArticlesList, ArticlesSingle } from '../containers';

import AboutComponent from '../components/app/About';
import LoginComponent from '../components/app/Login';
import { AuthConsumer } from '../components/base/Auth/AuthContext';
import withContextConsumer from '../components/base/withContextConsumer';

const CustomRouter = ({ authenticated }) => (
  <Router>
    <Stack key="root">
      <Stack hideNavBar>
        {!authenticated ? (
          <Scene key="login" component={LoginComponent} />) : (
            <Scene key="home" hideNavBar>
              <Tabs
                key="tabbar"
                swipeEnabled
                type="replace"
                showLabel={false}
                {...DefaultProps.tabProps}
              >
                <Stack
                  key="home"
                  title="Recipe builder"
                  icon={() => <Icon name="book" type="AntDesign" {...DefaultProps.icons} />}
                  {...DefaultProps.navbarProps}
                >
                  <Scene key="home" component={AboutComponent} />
                </Stack>
                <Stack
                  key="articlesList"
                  title="My Recipes"
                  icon={() => <Icon name="favorite-border" type="MaterialIcons" {...DefaultProps.icons} />}
                  {...DefaultProps.navbarProps}
                >
                  <Scene key="articlesList" component={ArticlesList} />
                  <Scene key="articlesSingle" component={ArticlesSingle} />
                </Stack>
                <Stack
                  key="form"
                  title="Articles Form"
                  icon={() => <Icon name="shopping-cart" type="MaterialIcons" {...DefaultProps.icons} />}
                  {...DefaultProps.navbarProps}
                >
                  <Scene key="form" component={ArticlesForm} />
                </Stack>
              </Tabs>
            </Scene>
        )}
      </Stack>
    </Stack>
  </Router>
);

CustomRouter.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default withContextConsumer(CustomRouter, AuthConsumer);
