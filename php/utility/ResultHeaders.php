<?php
declare(strict_types=1);

// Discard SDK utility: result_headers

class DiscardResultHeaders
{
    public static function call(DiscardContext $ctx): ?DiscardResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
