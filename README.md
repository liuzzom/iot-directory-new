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

front-end directory: management </br>
back-end directory: api

TODO:
- get_all_contextbroker:
    - Chiedere a Difino come posso risolvere il bug di services = undefined per CB senza multiServices e questione encoding
    - Recupero delle info
- get_subset_contextbroker:
    - Lato Server
    - Lato Client
- get_all_contextbroker_latlong:
    - Lato Server
    - Lato Client
- ~~Add Broker~~:
    - ~~Inserimento elementi di interfaccia~~
    - ~~Controllo sui valori inseriti e feedback all'utente~~
    - ~~Gestione richiesta al server~~
    - ~~Controlli lato server~~
    - ~~Operazioni sul DB~~
    - ~~Risposta al client~~
    - ~~Relazione~~
- Edit Broker:
    - ~~Inserimento elementi di interfaccia~~
    - ~~Controllo sui valori inseriti e feedback all'utente~~
    - Gestione richiesta al server
    - Controlli lato server
    - Operazioni sul DB
        - UPDATE riga contextborker
        - SELECT su services -> si potrebbe usare la funzione create_datatable_data
        - Verfica se ci sono differenze tra i vecchi services e i nuovi services
            - Se non ci sono differenze, basta il CASCADE
            - Se ci sono differenze, elminare i vecchi services e inserire i nuovi (brutale o mirato?)
    - Risposta al client
    - Relazione
- ~~Delete Broker~~: -> il CASCADE dovrebbe bastarre -> chiedere a esperto
    - ~~Gestione richiesta al server~~
    - ~~Controlli lato server~~
    - ~~Operazioni sul DB~~
    - ~~Risposta al client~~
    - ~~Relazione~~
- Add Device:
    - Inserimento elementi di interfaccia
    - Controllo sui valori inseriti e feedback all'utente
    - Gestione richiesta al server
    - Controlli lato server
    - Operazioni sul DB
    - Risposta al client
    - Relazione
- Edit Device:
    - Inserimento elementi di interfaccia
    - Controllo sui valori inseriti e feedback all'utente
    - Gestione richiesta al server
    - Controlli lato server
    - Operazioni sul DB
    - Risposta al client
    - Relazione
- Delete Device:
    - Gestione richiesta al server
    - Controlli lato server
    - Operazioni sul DB
    - Risposta al client
    - Relazione