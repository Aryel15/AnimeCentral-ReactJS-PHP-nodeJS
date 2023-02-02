<?php
    //Headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

    //Incluir conexão
    include_once 'conexao.php';

    $response_json = file_get_contents("php://input");
    $dados = json_decode($response_json, true);

    if($dados){
        $query_anime = "UPDATE animes_list SET titulo=:titulo, status_=:status_, nota=:nota WHERE id=:id";
        $edit = $conn->prepare($query_anime);
        $edit->bindPaRAM(':titulo', $dados['anime']['titulo']);
        $edit->bindPaRAM(':status_', $dados['anime']['status_']);
        $edit->bindPaRAM(':nota', $dados['anime']['nota']);
        $edit->bindPaRAM(':id', $dados['anime']['id']);
        $edit->execute();

        if($edit->rowCount()){
            $response = [
                "erro" => false,
                "mensagem" => "Anime editado com sucesso!",
                "anime"=> $dados
            ];
        }else{
            $response = [
                "erro" => true,
                "mensagem" => "Não foi possível editar, tente mais tarde!",
                "anime"=> $dados
            ];
        }

    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Não foi possível editar, tente mais tarde)!",
            "anime"=> $dados
        ];
    }

    http_response_code(200);
    echo json_encode($response);