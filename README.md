This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Tnote

O projeto tnote é uma aplicação desenvolvida utilizando as tecnologias Next.js, Shadcn UI, Tailwind CSS, ESLint.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter lista de clientes;
- [x] Deve ser possível obter lista de projetos;
- [x] Deve ser possível obter lista de funcionários;
- [x] Deve ser possível obter lista de lançamentos;
- [ ] Deve ser possível cadastrar um cliente;
- [ ] Deve ser possível cadastrar um projeto;
- [x] Deve ser possível cadastrar um lançamento;
- [ ] Deve ser possível editar um cliente;
- [ ] Deve ser possível editar um projeto;
- [x] Deve ser possível editar um lançamento;
- [x] Deve ser possível duplicar um lançamento;

## RNs (Regras de negócio)

- [x] A lista de clientes só pode ser visualizada por Comercial(5) | Socio(3) | Admin(4);
- [x] A lista de projetos só pode ser visualizada por Comercial(5) | Socio(3) | Admin(4);
- [x] A lista de funcionários só pode ser visualizada por Administrativo(2) | Socio(3) | Admin(4);
- [x] A lista de lançamentos só pode ser visualizada por Funcionario(1) | Socio(3) | Admin(4);
- [x] A lista de lançamentos só pode ser adicionado um novo por Funcionario(1) | Socio(3) | Admin(4);
- [x] A lista de lançamentos só pode ser editada por Funcionario(1) | Socio(3) | Admin(4);
