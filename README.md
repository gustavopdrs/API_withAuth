<h1>API com Google Passport Auth</h1>
<table><thead><tr><th>Caminho</th><th>Descrição</th></tr></thead><tbody><tr><td><a href="https://guarded-waters-89508.herokuapp.com/elencos"><code>/elencos</code></a></td><td><p>GET: retorna um arquivo JSON contendo os elencos cadastrados</p><p>POST: insere um novo registro no banco de dados</p><p>PUT: faz a atualização de um registro no banco</p>
</td></tr><tr><td><a href=""https://guarded-waters-89508.herokuapp.com/jogadores"><code>/jogadores</code></a></td><td><p>GET: retorna um arquivo JSON contendo os jogadores cadastrados e seus respectivos elencos</p><p>POST: insere um novo registro no banco de dados</p><p>PUT: faz a atualização de um registro no banco</p>
</tr>
<tr><td><a href=""https://guarded-waters-89508.herokuapp.com/elencos/1"><code>/elencos/:id</code></a></td><td><p>GET: retorna um arquivo JSON contendo o elenco que corresponde ao ID informado</p><p>DELETE: apaga o registro com o ID informado no banco de dados</p>
</tr>
<tr><td><a href=""https://guarded-waters-89508.herokuapp.com/jogadores/1"><code>/jogadores/:id</code></a></td><td><p>GET: retorna um arquivo JSON contendo o jogador que corresponde ao ID informado</p><p>DELETE: apaga o registro com o ID informado no banco de dados</p>
</tr></tbody></table>
<h2>STATUS CODE</h2>
<table><thead><tr><th>Caminho</th><th>Descrição</th></tr></thead><tbody><tr><td><a href="https://guarded-waters-89508.herokuapp.com/elencos"><code>/elencos</code></a></td><td><p>GET: 200 - OK | 400 - Erro ao consultar os elencos</p><p>POST: 200 - OK | 400 - Erro ao criar o elenco</p><p>PUT: 200 - OK | 400 - Erro ao alterar o elenco</p>
</td></tr><tr><td><a href=""https://guarded-waters-89508.herokuapp.com/jogadores"><code>/jogadores</code></a></td><td><p>GET: 200 - OK | 400 - Erro ao consultar os jogadores</p><p>POST: 200 - OK | 400 - Erro ao criar o jogador</p><p>PUT: 200 - OK | 400 - Erro ao alterar o jogador</p>
</tr>
<tr><td><a href=""https://guarded-waters-89508.herokuapp.com/elencos/1"><code>/elencos/:id</code></a></td><td><p>GET: 200 - OK | 400 - Erro ao consultar o elenco</p><p>DELETE: 200 - OK | 400 - Erro ao remover o elenco</p>
</tr>
<tr><td><a href=""https://guarded-waters-89508.herokuapp.com/jogadores/1"><code>/jogadores/:id</code></a></td><td><p>GET: 200 - OK | 400 - Erro ao consultar o jogador</p><p>DELETE: 200 - OK | 400 - Erro ao remover o jogador</p>
</tr></tbody></table>
