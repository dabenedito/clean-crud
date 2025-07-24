# Guia Rápido de Instalação e Execução — Projeto CleanUserCrud

## Requisitos

- [.NET SDK 8](https://dotnet.microsoft.com/en-us/download)
- Terminal com acesso a comandos `dotnet`
- (Opcional) [VS Code](https://code.visualstudio.com/) ou outra IDE
---
## Passo 1 — Clonar o repositório

```bash
git clone https://github.com/dabenedito/CleanUserCrud.git
cd CleanUserCrud
```

## Passo 2 — Restaurar pacotes NuGet
```bash
dotnet restore
```

## Passo 3 — Criar/migrar banco SQLite
Se quiser criar o banco automaticamente (usando migrations):

```bash
dotnet ef database update
```

Se não tiver o CLI do EF instalado:
```bash
dotnet tool install --global dotnet-ef
```

## Passo 5 — Executar a API
```bahs
dotnet run
```
Por padrão, a API vai rodar em:

- https://localhost:5024

## Passo 6 — Testar o CRUD
Acesse o [Swagger UI](https://localhost:5024/swagger) para testar os endpoints:

- `[GET] /api/user`
- `[GET] /api/user/{id}`
- `[POST] /api/user`
- `[PUT] /api/user/{id}`
- `[DELETE] /api/user/{id}`
---
## Observações finais
O banco SQLite será criado no arquivo users.db na raiz do projeto.

A API já está configurada com CORS para permitir chamadas do Angular na porta 4200 (ajuste no Program.cs se necessário).

Para alterar a string de conexão, edite o arquivo Program.cs.