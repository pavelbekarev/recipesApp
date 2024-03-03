import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
  FormLayoutGroup,
  FormItem,
  Input,
  Title,
  Textarea,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useUnit } from 'effector-react';
import { $setUserOnServer, $user } from '../store/user';
import { $recipes, filterRecipes } from '../store/recipe';
import { createRecipeFx, deleteRecipeFx, getRecipeFx } from '../api/recipe';

import "../styles/Home.scss";
import { RecipeType } from '../types/recipeType';


export const Home = ({ id } : any) => {
  const routeNavigator = useRouteNavigator();

  const [ userServer, recipes ] = useUnit([$setUserOnServer, $recipes]);
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeDescription, setNewRecipeDescription] = useState("");


  useEffect(() => {
    if (userServer) {
      getRecipeFx(userServer.id)
    }
  }, [userServer])


  const addRecipe = async () => {
    if (!newRecipeTitle.trim() || !newRecipeDescription.trim()) return;

    const newRecipe: RecipeType = {
      title: newRecipeTitle,
      descr: newRecipeDescription,
      userId: userServer.id
    }

    const data: RecipeType = await createRecipeFx(newRecipe);

    if (data) {
      setNewRecipeTitle("");
      setNewRecipeDescription("");
    }
  }


  const deleteRecipe = async (recipeId: string) => {
    const status = await deleteRecipeFx(recipeId);

    if (status == 200) {
      filterRecipes(recipeId);
    }
  }


  return (
    <Panel id={id}>
      <PanelHeader 
        className='recipes__panelheader'
      >
        Рецепты
      </PanelHeader>

      <Group>
        <FormLayoutGroup>
          <FormItem top="Название блюда">
            <Input 
              value={newRecipeTitle}
              onChange={(e) => setNewRecipeTitle(e.target.value)}
            />
          </FormItem>

          <FormItem top="Описание блюда">
            <Input 
              value={newRecipeDescription}
              onChange={(e) => setNewRecipeDescription(e.target.value)}
            />
          </FormItem>

          <Button 
            style={{marginTop: 20, marginBottom: 120}}
            onClick={addRecipe}
          >
            Добавить
          </Button>
        </FormLayoutGroup>
      </Group>

      <Title style={{margin: 20}}>Список рецептов</Title>
      <FormLayoutGroup 
        className='formlayout'
      >
        {recipes.map(item => 
          <Group>
            <FormItem
              className='recipe_title'
              top={item.title}
            >
              <Input
                className='recipe_descr' 
                value={item.descr} 
              />
              <div className='button_container'>
                <Button 
                  className='delete_button'
                  onClick={(e) => {
                    deleteRecipe(item.id)
                  }}
                >
                  Удалить
                </Button>
              </div>
            </FormItem>  
          </Group>
        )}
      </FormLayoutGroup>
    </Panel>
  );
};
