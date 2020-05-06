# iot-directory

IOT Directory, IOT Discovery, etc.

The Snap4City platform is based on components based on Km4City framework also on this github. 
Please read the documentation on Snap4City.org to understand which components you need to install 
according to your goals.

Documentation is accessible from https://www.snap4city.org https://www.km4city.org 
https://www.disit.org Some documentation is also replicated on https://www.sii-mobility.org

most of the Snap4City components can be provided in form of appliance, please contact Paolo.nesi@unifi.it 
Appliance are in subtance Virtual Machines that you can execute on your premise, fully configure, 
since we provide you full access at level of Root / Admin. The Vm are mainly with Linux like operating system

## Struttura delle Directory
front-end directory: management </br>
back-end directory: api

## Attività

### Sezione Broker

#### Modifica al DB 
- ~~get_all_contextbroker~~:
    - ~~Lato Server~~
    - ~~Lato Client~~
- ~~get_subset_contextbroker~~:
    - ~~Lato Server~~
    - ~~Lato Client~~
- ~~get_all_contextbroker_latlong~~: -> NON necessita modifiche
    - ~~Lato Server~~
    - ~~Lato Client~~

#### Add Broker
- ~~Inserimento elementi di interfaccia~~
- ~~Controllo sui valori inseriti e feedback all'utente~~
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Edit Broker
- ~~Inserimento elementi di interfaccia~~:
- ~~Controllo sui valori inseriti e feedback all'utente~~
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Delete Broker -> il CASCADE dovrebbe bastarre
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

### Sezione Modelli

#### Add Model:
- ~~Inserimento elementi nell'interfaccia utente~~
- ~~Controllo sui valori inseriti e feedback all'utente~~
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Edit Model
- ~~Inserimento elementi nell'interfaccia utente~~
- ~~Controllo sui valori inseriti e feedback all'utente~~
- ~~Modifica alla get per l'ottenimento delle informazioni del service e del servicePath usato~~
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Delete Model -> non dovrebbe richiedere modifiche 
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

### Sezione Device

#### Add Device (IoT Devices)
- ~~Inserimento elementi di interfaccia~~
- ~~Controllo sui valori inseriti e feedback all'utente~~
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Add Device (My IoT Devices (Schermata più guidata))
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

####  Edit Device -> Non Supportato: Elementi in sola lettura
- ~~Inserimento elementi di interfaccia~~
- ~~Controllo sui valori inseriti e feedback all'utente~~
- ~~Modifiche nelle get sulla mappa~~
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Delete Device
- ~~Gestione richiesta al server~~
- ~~Controlli lato server~~
- ~~Operazioni sul DB~~
- ~~Risposta al client~~
- ~~Relazione~~

#### Risoluzione Ambiguità ID
- Modifica DB 
    - ~~Modifica lunghezza colonne service e servicePath (25 service, 96 servicePath)~~
    - ~~Modifica lunghezza colonna id (lunghezza massima 255 -> lunghezza massima nome device = 134)~~
- Riduzione lunghezza service
    - ~~Lato client (cbsManagement e cbsEditManagement)~~
    - ~~Lato server~~
- Riduzione lunghezza servicePath 
    - ~~Lato client~~
    - ~~Lato server~~
- Impedimento utilizzo ";" nel servicePath
    - ~~Lato client~~
    - ~~Lato server~~
- Insert
    - ~~insert_device~~
    - ~~registerKB (modifcare l'uri)~~
- Get
    - ~~get_all_device -> usata nel caricamento di devices.php (IOT Devices)~~
    - ~~get_all_device_admin -> usata nel caricamento di alldevices.php (IOT Devices Management)~~
    - ~~get_subset_device -> usata quando si seleziona tramite mappa in devices.php (IOT Devices)~~
    - ~~get_subset_device_admin -> usata quando si seleziona tramite mappa in alldevices.php (IOT Devices Management)~~
    - ~~get_all_private_event_value -> usata in mydevices~~
    - ~~get_subset_event_value -> usata in mydevices e in value quando si seleziona tramite mappa~~
    - ~~get_all_delegated_event_value -> usata in mydevices quando si seleziona delegated devices (da testare in maniera approfondita)~~
    - ~~get_all_event_value -> usata in value~~
    - ~~get_device_attributes -> usata in devices quando si clicca su edit (modificare anche lato client)~~
- Update
    - ~~update_device~~
    - ~~updateKB~~
- Delete
    - ~~delete_device~~
    - ~~deleteKB~~
- Relazione

- una/due api che puo ricevere
    - devicename
    - tenenacy
    - servicepath
    - cbname oppure subscription_id
    - e che ritorna la lista dei sensori (quelli che sono chiamati event_values)

ci sara' sicuro gia' una funzione del genere ma e' da richiamare o da generalizzare per il discorso tenancy/servicapath e il discorso cbname/subscription_id

### Aggiornamento createtables.sql
- services
- model
- devices
- deleted_devices
- temporary_devices

## Segnalazioni
- Problemi con la gestione delle ownership e i limiti
- Workaround in registerKB legato al campo "type" del broker (ngsi w/MultiService non è supportato)
- Workaround in updateKB legato al campo "type" del broker (ngsi w/MultiService non è supportato)
- Workaround in deleteKB legato al campo "type" del broker (ngsi w/MultiService non è supportato)
- Impossibilità di modificare i campi service e servicePath di un device a livello di CB -> queste informazioni non sono nel body ma nell'header