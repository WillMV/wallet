// import React from 'react';
import { screen } from '@testing-library/react';
// import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import App from '../App';

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
    login: 'email@email.com',
    password: '123456',
  },
  {
    login: 'a@a.c',
    password: 'abcdef',
  },
  {
    login: 'email@email.com',
    password: 'a1b2c3d4e5f6',
  },
  {
    login: 'email@email.com',
    password: '123456*a',
  },
  {
    login: 'email@email.com',
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
