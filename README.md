# SIOPPER — Website institucional

Website institucional da SIOPPER, construído com React, Vite e TypeScript.

## Executar localmente

```bash
npm install
npm run dev
```

## Verificar e compilar

```bash
npm run build
npm run preview
```

O resultado de produção é criado em `dist/`. Publique o conteúdo dessa pasta num alojamento estático compatível com Vite. Configure o alojamento para servir `index.html` nas rotas da aplicação e `404.html` nas páginas não encontradas.

## Formulário de orçamento

O formulário valida os campos obrigatórios no navegador e prepara a mensagem do pedido para o número oficial da SIOPPER no WhatsApp. O visitante confirma o envio no WhatsApp. O site não armazena nem envia dados em segundo plano; para processamento automático, será necessário ligar o formulário a um backend ou serviço de formulários autorizado pela empresa.

## Identidade visual e imagens

- O logótipo original e fotografias institucionais estão em `public/images/`. Foram optimizados a partir dos ficheiros fornecidos, sem alterar os originais na pasta `imagens/`.
- `siopper-logo.jpg`: logótipo oficial, usado no cabeçalho, rodapé, página 404 e favicon.
- `siopper-protection.jpg`: fotografia de agentes usada no hero.
- `siopper-team.jpg`: recorte da fotografia institucional usado na secção “Sobre nós”.
- `siopper-guard.jpg`: fotografia de agente usada na secção de segurança humana.
- Não são carregadas fotografias externas de demonstração.

## Dados a confirmar

- O endereço fornecido não inclui cidade ou coordenadas. O link de mapa pesquisa apenas “Avenida 21 de Janeiro” e não indica uma localização exacta.
- O Instagram é apresentado como `_Siopper_Segurança`; o link usa a forma sem acento `_Siopper_Seguranca`, compatível com nomes de utilizador do Instagram.
# site-siopper
