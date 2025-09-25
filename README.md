# Campaign Bulk Load Template for Excel

This table provides a template for bulk loading campaign data into the PreventaBBO system. Each row represents a campaign entry or an update to an existing campaign. The fields correspond to the `CampaignMasivaDto` structure used in the `CreateCampaignMasivaCommandHandler`. Required fields are marked with an asterisk (*).

| CampId | CampNombre* | CampDescripcion | CampFechaInicio* | CampFechaFin* | CampPrioridad* | CampEstado* | CampPermiteMultiples* | AsociarACampañaExistente | Artid* | CamProCantidadMin* | CamProCantidadMax | CamProPrecioPromocional | CliId* | LisId* | ArtidRequisito | CampReqCantidadRequisito |
|--------|-------------|-----------------|------------------|---------------|----------------|-------------|-----------------------|--------------------------|--------|--------------------|-------------------|-------------------------|--------|--------|----------------|-------------------------|
| 0      | Summer Promo 2025 | Summer discount campaign | 2025-10-01 | 2025-12-31 | Alta | A | S | false | ART001 | 5 | 10 | 9.99 | CLI001 | LIS001 | ART002 | 2 |
| 0      | Summer Promo 2025 | Summer discount campaign | 2025-10-01 | 2025-12-31 | Alta | A | S | false | ART003 | 3 | 5 | 14.99 | CLI002 | LIS001 |  |  |
| 1      |  |  |  |  |  |  |  | true | ART004 | 2 | 4 | 19.99 | CLI003 | LIS002 |  |  |
| 0      | Winter Sale | Winter clearance | 2025-11-01 | 2026-01-15 | Media | A | N | false | ART005 | 10 | 20 | 7.50 | CLI004 | LIS003 | ART006 | 3 |

## Column Descriptions

- **CampId**: The ID of an existing campaign. Use `0` for new campaigns. If `AsociarACampañaExistente` is `true` or a valid `CampId` is provided, the system associates the row's data (client, article, price list) to the existing campaign.
- **CampNombre***: The campaign name. Required for new campaigns. If `AsociarACampañaExistente` is `true`, the system checks for an existing campaign with this name if `CampId` is not provided.
- **CampDescripcion**: Optional description of the campaign.
- **CampFechaInicio***: Start date of the campaign (YYYY-MM-DD). Required for new campaigns.
- **CampFechaFin***: End date of the campaign (YYYY-MM-DD). Required for new campaigns.
- **CampPrioridad***: Priority of the campaign (e.g., Alta, Media, Baja). Required for new campaigns.
- **CampEstado***: Campaign status (e.g., A for active). Required for new campaigns.
- **CampPermiteMultiples***: Indicates if multiple promotions are allowed (S for sí/yes, N for no). Required for new campaigns.
- **AsociarACampañaExistente**: Set to `true` to associate data with an existing campaign (identified by `CampId` or `CampNombre`). Set to `false` for new campaigns.
- **Artid***: Article ID for the campaign product. Required for each row.
- **CamProCantidadMin***: Minimum quantity for the promotional article. Must be greater than 0.
- **CamProCantidadMax**: Maximum quantity for the promotional article. Optional.
- **CamProPrecioPromocional**: Promotional price for the article. Optional (defaults to regular price if not provided).
- **CliId***: Client ID to associate with the campaign. Required for each row.
- **LisId***: Price list ID for the campaign. Required for each row.
- **ArtidRequisito**: Article ID for a campaign requirement (if any). Optional.
- **CampReqCantidadRequisito**: Quantity required for the requirement article. Required if `ArtidRequisito` is provided.

## Notes
- **Required Fields**: Ensure `CampNombre`, `CampFechaInicio`, `CampFechaFin`, `CampPrioridad`, `CampEstado`, `CampPermiteMultiples`, `Artid`, `CamProCantidadMin`, `CliId`, and `LisId` are provided for new campaigns. For existing campaigns, only `CampId` or `CampNombre` (with `AsociarACampañaExistente=true`) and the required article/client/price list fields are needed.
- **Existing Campaigns**: If `AsociarACampañaExistente` is `true`, the system adds the specified client (`CliId`), price list (`LisId`), and article (`Artid`) to the existing campaign without creating a new one. If the campaign is not found, an error is thrown.
- **Validation**: The system checks for valid article IDs, minimum quantities, and existing campaigns. Duplicate campaign names for new campaigns (when `AsociarACampañaExistente` is `false`) will cause an error.
- **Excel Formatting**: Save the file as `.xlsx`. Ensure dates are in `YYYY-MM-DD` format and numeric fields (e.g., `CamProCantidadMin`, `CamProPrecioPromocional`) are formatted as numbers.
- **Usage**: Upload the Excel file to the API endpoint `[HttpPost("masiva-excel")]` as a list of `CampaignMasivaDto` objects.







# Bulk Load Articles to Existing Campaigns Template for Excel

This table provides a template for bulk loading articles into existing campaigns in the PreventaBBO system. Each row associates an article with an existing campaign, identified by `CampId` or `CampNombre`. Required fields are marked with an asterisk (*).

| CampId | CampNombre | AsociarACampañaExistente* | Artid* | CamProCantidadMin* | CamProCantidadMax | CamProPrecioPromocional |
|--------|------------|---------------------------|--------|--------------------|-------------------|-------------------------|
| 1      |            | true                      | ART001 | 5                  | 10                | 9.99                    |
| 0      | Summer Promo 2025 | true             | ART002 | 3                  | 5                 | 14.99                   |
| 2      |            | true                      | ART003 | 2                  | 4                 | 19.99                   |
| 0      | Winter Sale | true                   | ART004 | 10                 | 20                | 7.50                    |

## Column Descriptions

- **CampId**: The ID of the existing campaign. Use `0` if identifying the campaign by `CampNombre`. If provided, it takes precedence over `CampNombre`.
- **CampNombre**: The name of the existing campaign. Required if `CampId` is `0`. Used to look up the campaign when `AsociarACampañaExistente` is `true`.
- **AsociarACampañaExistente***: Must be `true` to associate articles with an existing campaign. Set to `true` for all rows in this template.
- **Artid***: The article ID to associate with the campaign. Required for each row.
- **CamProCantidadMin***: Minimum quantity for the promotional article. Must be greater than 0.
- **CamProCantidadMax**: Maximum quantity for the promotional article. Optional.
- **CamProPrecioPromocional**: Promotional price for the article. Optional (defaults to regular price if not provided).

## Notes
- **Required Fields**: `Artid`, `CamProCantidadMin`, and `AsociarACampañaExistente` are mandatory. Either `CampId` (non-zero) or `CampNombre` must be provided to identify the campaign.
- **Validation**: The system checks if the campaign exists using `CampId` or `CampNombre`. If not found, an error is thrown (e.g., `KeyNotFoundException`). `CamProCantidadMin` must be greater than 0.
- **Existing Campaigns**: The system adds the specified article (`Artid`, `CamProCantidadMin`, `CamProCantidadMax`, `CamProPrecioPromocional`) to the `TbCampañaArticulos` collection of the existing campaign and updates the `CampFechaTxn` to the current timestamp.
- **Excel Formatting**: Save as `.xlsx`. Ensure `Artid` is a valid article ID, `CamProCantidadMin` and `CamProCantidadMax` are positive integers, and `CamProPrecioPromocional` is a valid decimal (if provided).
- **Usage**: Upload to the `[HttpPost("masiva-excel")]` endpoint as a list of `CampaignMasivaDto` objects. The system processes each row to add articles to the specified campaigns.








# Bulk Load Clients to Existing Campaigns Template for Excel

This table provides a template for bulk loading clients into existing campaigns in the PreventaBBO system. Each row associates a client with an existing campaign, identified by `CampId` or `CampNombre`. Required fields are marked with an asterisk (*).

| CampId | CampNombre | AsociarACampañaExistente* | CliId* |
|--------|------------|---------------------------|--------|
| 1      |            | true                      | CLI001 |
| 0      | Summer Promo 2025 | true             | CLI002 |
| 2      |            | true                      | CLI003 |
| 0      | Winter Sale | true                   | CLI004 |

## Column Descriptions

- **CampId**: The ID of the existing campaign. Use `0` if identifying the campaign by `CampNombre`. If provided, it takes precedence over `CampNombre`.
- **CampNombre**: The name of the existing campaign. Required if `CampId` is `0`. Used to look up the campaign when `AsociarACampañaExistente` is `true`.
- **AsociarACampañaExistente***: Must be `true` to associate clients with an existing campaign. Set to `true` for all rows in this template.
- **CliId***: The client ID to associate with the campaign. Required for each row.

## Notes
- **Required Fields**: `CliId` and `AsociarACampañaExistente` are mandatory. Either `CampId` (non-zero) or `CampNombre` must be provided to identify the campaign.
- **Validation**: The system checks if the campaign exists using `CampId` or `CampNombre`. If not found, an error is thrown (e.g., `KeyNotFoundException`).
- **Existing Campaigns**: The system adds the specified `CliId` to the `TbCampañaClientes` collection of the existing campaign and updates the `CampFechaTxn` to the current timestamp.
- **Excel Formatting**: Save as `.xlsx`. Ensure `CliId` is a valid client ID from the system, and `AsociarACampañaExistente` is set to `true` (text or boolean format).
- **Usage**: Upload to the `[HttpPost("masiva-excel")]` endpoint as a list of `CampaignMasivaDto` objects. The system processes each row to add clients to the specified campaigns.
