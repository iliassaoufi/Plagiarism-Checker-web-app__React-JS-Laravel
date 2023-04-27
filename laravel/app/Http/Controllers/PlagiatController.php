<?php

namespace App\Http\Controllers;

use App\Models\Plagiat;
use App\Models\User;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Monolog\Handler\RotatingFileHandler;

class PlagiatController extends Controller
{

    public function userPlagiatChecks()
    {
        $plagiats = auth()->user()->plagiatChecks->sortBy("created_at");
        $result = array();

        foreach ($plagiats as $plagiat) {
            $json = Storage::get($plagiat->result_path);
            $data = json_decode($json, true);
            $data += array("created_at" => $plagiat->created_at);
            $data += array("id" => $plagiat->id);
            array_push($result,  $data);
        }
        return $result;
    }

    public function store($type, Request $request)
    {
        $name =        rand(1000, 9999) . "_" . time();
        $fileName = "temp/input_" . $name;
        $python_path = "C:/Users/ilias/AppData/Local/Programs/Python/Python39/";
        $path = storage_path('app/');

        if (strtolower($type) == "text") {

            $input = $request->validate([
                'text' => 'required|string|min:60'
            ]);
            Storage::disk('local')->put($fileName, $input["text"]);
        } else if (strtolower($type) == "file") {

            $input = $request->validate([
                'file' => 'required|mimes:pdf,doc,txt,docx'
            ]);
            $fileName = $fileName . "." . $input["file"]->extension();
            $input["file"]->move($path . "/temp", $fileName);
        }
        $path_Python_PlagiatChecker = ' "C:\wamp64\www\plagiat-project\Python/main.py" ';
        $cmd =   $path_Python_PlagiatChecker . ' "' .  $path . $fileName . '" "' .  $path . 'temp/output_' . $name . '"';

        if (substr(PHP_OS, 0, 3) == 'WIN') {
            shell_exec($python_path . 'python.exe ' . $cmd);
        } else {
            shell_exec("python" . $cmd);
        }
        if (Storage::disk('local')->exists("temp/output_$name.json")) {
            $json = Storage::get("temp/output_$name.json");
            $data = json_decode($json, true);
        } else {
            return Response([
                "message" => "Bad Request"
            ], 400);
        }
        if ($data["state"]) {

            $plagiat = Plagiat::create([
                "user_id" => auth()->user()->id,
                "text_path" => $fileName,
                "result_path" => "temp/output_$name.json",
                "is_plagiat" => $data["plagiat"]
            ]);
            $data += array("created_at" => $plagiat->created_at);
            $data += array("id" => $plagiat->id);
            return $data;
        }

        return Response([
            "message" => "Bad Request"
        ], 400);
    }


    public function destroy($id)
    {

        auth()->user()->plagiatChecks->find($id)->delete();
        return Response([
            "message" => "deleted !!"
        ], 200);
    }
}