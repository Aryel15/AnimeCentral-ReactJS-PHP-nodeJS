<?php
    //Headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    //Incluir conexão
    include_once 'conexao.php';

    $query_animes = "SELECT id, titulo, status_, nota, user FROM animes_list ORDER BY nota DESC";
    $result_animes = $conn->prepare($query_animes);
    $result_animes->execute();

    if(($result_animes) AND ($result_animes->rowCount() != 0)){
        while($row_anime = $result_animes->fetch(PDO::FETCH_ASSOC)){
            extract($row_anime);

            $lista_animes["records"][$id] = [
                'id' => $id,
                'titulo' => $titulo,
                'status_' => $status_,
                'nota' => $nota,
                'user' => $user
        ];
        }
        //resposta
        http_response_code(200);

        //retorno json
        echo json_encode($lista_animes);
    }