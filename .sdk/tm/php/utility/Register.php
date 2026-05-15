<?php
declare(strict_types=1);

// Discard SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

DiscardUtility::setRegistrar(function (DiscardUtility $u): void {
    $u->clean = [DiscardClean::class, 'call'];
    $u->done = [DiscardDone::class, 'call'];
    $u->make_error = [DiscardMakeError::class, 'call'];
    $u->feature_add = [DiscardFeatureAdd::class, 'call'];
    $u->feature_hook = [DiscardFeatureHook::class, 'call'];
    $u->feature_init = [DiscardFeatureInit::class, 'call'];
    $u->fetcher = [DiscardFetcher::class, 'call'];
    $u->make_fetch_def = [DiscardMakeFetchDef::class, 'call'];
    $u->make_context = [DiscardMakeContext::class, 'call'];
    $u->make_options = [DiscardMakeOptions::class, 'call'];
    $u->make_request = [DiscardMakeRequest::class, 'call'];
    $u->make_response = [DiscardMakeResponse::class, 'call'];
    $u->make_result = [DiscardMakeResult::class, 'call'];
    $u->make_point = [DiscardMakePoint::class, 'call'];
    $u->make_spec = [DiscardMakeSpec::class, 'call'];
    $u->make_url = [DiscardMakeUrl::class, 'call'];
    $u->param = [DiscardParam::class, 'call'];
    $u->prepare_auth = [DiscardPrepareAuth::class, 'call'];
    $u->prepare_body = [DiscardPrepareBody::class, 'call'];
    $u->prepare_headers = [DiscardPrepareHeaders::class, 'call'];
    $u->prepare_method = [DiscardPrepareMethod::class, 'call'];
    $u->prepare_params = [DiscardPrepareParams::class, 'call'];
    $u->prepare_path = [DiscardPreparePath::class, 'call'];
    $u->prepare_query = [DiscardPrepareQuery::class, 'call'];
    $u->result_basic = [DiscardResultBasic::class, 'call'];
    $u->result_body = [DiscardResultBody::class, 'call'];
    $u->result_headers = [DiscardResultHeaders::class, 'call'];
    $u->transform_request = [DiscardTransformRequest::class, 'call'];
    $u->transform_response = [DiscardTransformResponse::class, 'call'];
});
