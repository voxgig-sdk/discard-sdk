<?php
declare(strict_types=1);

// Discard SDK utility: result_body

class DiscardResultBody
{
    public static function call(DiscardContext $ctx): ?DiscardResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
