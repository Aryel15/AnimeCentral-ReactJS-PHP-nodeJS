<?php
    //Headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

    //Incluir conexão
    include_once 'conexao.php';

    $response = "";
    $id = filter_input(INPUT_GET, 'id');
    //$user = 'Ary';
    
    $query_animes = "SELECT id, titulo, status_, nota, user FROM animes_list WHERE id=:id ";
    $result_myanimes = $conn->prepare($query_animes);
    $result_myanimes->bindPaRAM(':id', $id);
    $result_myanimes->execute();

    if(($result_myanimes) AND ($result_myanimes->rowCount() != 0)){
        while($row_anime = $result_myanimes->fetch(PDO::FETCH_ASSOC)){
            extract($row_anime);
    
            $myanimes[$id] = [
                'id' => $id,
                'titulo' => $titulo,
                'status_' => $status_,
                'nota' => $nota,
                'user' => $user
            ];
            $response = [
                "erro" => false,
                "animes" => $myanimes
            ];
        }
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Anime não encontrado!"
        ];
    }
    //resposta
    http_response_code(200);
    //retorno json
    echo json_encode($myanimes);