// Função para buscar usuários com base na pesquisa
function searchUsers() {
    const searchInput = document.getElementById('searchInput').value;
    
    // Fazer uma requisição AJAX para o servidor com a pesquisa
    fetch(`/buscar-usuarios?query=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = ''; // Limpar a tabela
            
            // Preencher a tabela com os resultados da pesquisa
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.senha}</td>
                    <td><button onclick="deleteUser(${user.id})">Deletar</button></td>
                `;
                userTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
}

// Função para deletar um usuário
function deleteUser(userId) {
    // Fazer uma requisição AJAX para o servidor para deletar o usuário com o ID especificado
    fetch(`/deletar-usuario/${userId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            // Atualizar a tabela após a exclusão do usuário
            searchUsers();
        })
        .catch(error => {
            console.error('Erro ao deletar usuário:', error);
        });
}