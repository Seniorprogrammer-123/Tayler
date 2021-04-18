<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $items = Report::orderBy('created_at', 'desc')->get();
        return $items->toJson();
    }

    /**
     * Sends sms to user using Twilio's programmable sms client
     * @param String $message Body of sms
     * @param Number $recipients Number of recipient
     */
    private function sendSMSMessage($message, $recipients)
    {
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_number = getenv("TWILIO_NUMBER");
        $client = new Client($account_sid, $auth_token);
        $recipients = "+56951009009";
        $client->messages->create($recipients, ['from' => $twilio_number, 'body' => $message]);
    }

    /**
     * Sends sms to user using Twilio's programmable sms client
     * @param String $message Body of WhatsApp
     * @param Number $recipients Number of recipient
     */
    private function sendWhatsAppMessage($message, $recipients)
    {
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_AUTH_TOKEN");
        // $twilio_number = getenv("TWILIO_NUMBER");
        $whatsapp_number = getenv("WHATSAPP_NUMBER");
        $client = new Client($account_sid, $auth_token);
        $recipients = "+56951009009";
        $client->messages->create("whatsapp:".$recipients, ["from" => "whatsapp:".$whatsapp_number, "body" => $message]);
    }

    /**
     * Send message to a selected users
     */
    public function sendCustomMessage(Request $request)
    {
        $validatedData = $request->validate([
            'users' => 'required|array',
            'body' => 'required',
        ]);
        $recipients = $validatedData["users"];
        // iterate over the array of recipients and send a twilio request for each
        foreach ($recipients as $recipient) {
            // $recipient = "+56951009009";
            $this->sendSMSMessage($validatedData["body"], $recipient);
        }
        return back()->with(['success' => "Messages on their way!"]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = Report::create([
            'name' => $request->name,
            'address' => $request->address,
            'email' => $request->email,
            'usagedata' => $request->usagedata,
            'phone' => $request->phone,
            'amount' => $request->amount,
        ]);
        if(!$item){
            return response()->json(["success"=>"N"]);
        }
        return response()->json(["success"=>"Y"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $item = Report::find($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $item = Report::find($id);

        $validatedData = $request->validate([
            'name' => $request->name,
            'address' => $request->address,
            'email' => $request->email,
            'usagedata' => $request->usagedata,
            'phone' => $request->phone,
            'amount' => $request->amount,
        ]);


        $item->name = $request->name == null ? '' : $request->name;
        $item->address = $request->address == null ? '' : $request->address;
        $item->email = $request->email == null ? '' : $request->email;
        $item->usagedata = $request->usagedata == null ? date("Y-m-d") : $request->usagedata;
        $item->phone = $request->phone == null ? '' : $request->phone;
        $item->amount = $request->amount == null ? '0' : $request->amount;
        // echo $item;
        $item->save();

        return response()->json(["success"=>"Y"]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $item = Report::find($id);
        $item->delete();

        return response()->json(["success"=>"Y"]);
    }

    public function getbydate($month, $year, $name)
    {
        $item = Report::where('name', '=', $name)
                        ->where('usagedata', '<=', $year."-".$month."-31")
                        ->where('usagedata', '>=', $year."-".$month."-01")
                        ->orderBy('usagedata', 'asc')
                        ->get();
        return response()->json($item);
    }

    public function getbymonth($year, $name)
    {
        // SELECT MONTH(usagedata) AS ml, AVG(amount)*30 AS am FROM reports WHERE YEAR(usagedata) = $year AND name=$name GROUP BY MONTH(usagedata) ORDER BY ml ASC

        $item = DB::table('reports')
             ->select(DB::raw('MONTH(usagedata) AS ml, AVG(amount)*30 AS am'))
             ->whereRaw('YEAR(usagedata) = ?', [$year])
             ->where('name', '=', $name)
             ->groupByRaw('MONTH(usagedata)')
             ->orderBy('ml')
             ->get();
        return response()->json($item);
    }

}
