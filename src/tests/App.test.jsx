import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockData from './helpers/mockData';

global.fetch = async () => ({
  json: () => ({
    ...mockData,
  }),
});

const invalidAccounts = [
  {
    login: 'email.com@email',
    password: '123456',
  },
  {
    login: 'emailemail',
    password: '1236',
  },
  {
    login: 'emailecom',
    password: '12346',
  },
  {
    login: 'e',
    password: '1236',
  },
];
const validAccounts = [
  {
    login: 'aemail@email.com',
    password: '123456',
  },
  {
    login: 'a@a.c',
    password: 'abcdef',
  },
  {
    login: 'edmail@email.com',
    password: 'a1b2c3d4e5f6',
  },
  {
    login: 'emgail@email.com',
    password: '123456*a',
  },
  {
    login: 'emdail@email.com',
    password: 'A*123456',
  },
];

const email = 'email-input';
const password = 'password-input';

describe('Testa o Login', () => {
  test('A renderização da página', () => {
    // 1.
    renderWithRouterAndRedux();
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    // 2.
    // 3.
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnEntrar).toBeInTheDocument();
  });
  test('A validação do botão de entrar', () => {
    renderWithRouterAndRedux();
    // 1.
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    // 2.
    // 3.
    expect(btnEntrar).toBeDisabled();
    invalidAccounts.forEach((account) => {
      userEvent.type(emailInput, account.login);
      userEvent.type(passwordInput, account.password);
      expect(btnEntrar).toBeDisabled();
    });
    validAccounts.forEach((account) => {
      userEvent.type(emailInput, account.login);
      userEvent.type(passwordInput, account.password);
      expect(btnEntrar).not.toBeDisabled();
    });
  });
  test(
    'Se ao inserir conta valida e clicar no botão renderiza a pagina Wallet',
    async () => {
      // 1.
      const { history } = renderWithRouterAndRedux();
      const btnEntrar = screen.getByRole('button', { name: /entrar/i });
      const emailInput = screen.getByTestId(email);
      const passwordInput = screen.getByTestId(password);
      userEvent.type(emailInput, validAccounts[0].login);
      userEvent.type(passwordInput, validAccounts[0].password);
      userEvent.click(btnEntrar);
      // console.log(history);
      // await waitFor(() => expect(history.location.pathname).toBe('/carteira'));
      expect(history.location.pathname).toBe('/carteira');
    },
  );
});
const DEZ = '10';
const DESCRIPTION = 'descrição';
describe('testa a pagina carteira', () => {
  const initialState = {
    user: { email: 'email@email.com' },
  };
  const initialEntries = ['/carteira'];
  test('se ao entrar renderiza o email do usuário', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader.innerHTML).toBe('email@email.com');
    expect(emailHeader).toBeInTheDocument();
  });
  test('Se é possível inserir despesas', async () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const inputValue = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btnEnviar = screen.getByTestId('button-send');

    userEvent.type(inputValue, DEZ);
    userEvent.type(descriptionInput, DESCRIPTION);

    expect(inputValue.value).toEqual(DEZ);
    expect(descriptionInput.value).toEqual(DESCRIPTION);

    userEvent.click(btnEnviar);
    await waitFor(() => {
      expect(inputValue.value).not.toEqual(DEZ);
      expect(descriptionInput.value).not.toEqual(DESCRIPTION);
    });

    const deleteBtn = screen.getByTestId('delete-btn');

    expect(inputValue).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(deleteBtn).not.toBeInTheDocument();

    userEvent.type(inputValue, DEZ);
    userEvent.type(descriptionInput, DESCRIPTION);

    userEvent.click(btnEnviar);

    await waitFor(() => {
      expect(inputValue.value).not.toEqual(DEZ);
      expect(descriptionInput.value).not.toEqual(DESCRIPTION);
    });

    const editBtn = screen.getByTestId('edit-btn');

    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    expect(btnEnviar.innerHTML).toBe('Editar Despesa');

    userEvent.click(btnEnviar);

    expect(editBtn).toBeInTheDocument();

    expect(inputValue).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(btnEnviar).toBeInTheDocument();
  });
});
