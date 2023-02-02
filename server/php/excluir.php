<?php
    //Headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

    //Incluir conexão
    include_once 'conexao.php';

    $id = filter_input(INPUT_GET, 'id');
    $response = '';

    $query_delete = "DELETE FROM animes_list WHERE id=:id LIMIT 1";
    $delete_anime = $conn->prepare($query_delete);
    $delete_anime->bindParam(':id', $id);

    if($delete_anime->execute()){
        $response = [
            "erro" => false,
            "mensagem" => "Anime excluido com successo!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Não foi possível excluir este anime!"
        ];
    }



    http_response_code(200);
    echo json_encode($response);