# Entity Library

Support services for entity management.

<ul>
<li>EntitySyncService</li>
</ul>

##EntitySyncService
[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgQXBwXG4gICAgcGFydGljaXBhbnQgTW9kdWxlQVxuICAgIHBhcnRpY2lwYW50IE1vZHVsZUJcbiAgICBwYXJ0aWNpcGFudCBFbnRpdHlTeW5jU2VydmljZVxuICAgIHBhcnRpY2lwYW50IENhY2hlXG4gICAgcGFydGljaXBhbnQgQVBJXG4gICAgTW9kdWxlQS0-PitFbnRpdHlTeW5jU2VydmljZTogUmVnaXN0ZXIgZW50aXRpZXNcbiAgICBNb2R1bGVCLT4-K0VudGl0eVN5bmNTZXJ2aWNlOiBSZWdpc3RlciBlbnRpdGllc1xuICAgIEFwcC0-PitFbnRpdHlTeW5jU2VydmljZTogSW5pdFxuICAgIEVudGl0eVN5bmNTZXJ2aWNlLT4-K0NhY2hlOiBMb2FkIGVudGl0aWVzXG4gICAgQ2FjaGUtLT4-LUVudGl0eVN5bmNTZXJ2aWNlOiBSZXNwb25zZVxuICAgIEVudGl0eVN5bmNTZXJ2aWNlLT4-LUFwcDpEYXRhIHJlYWR5XG4gICAgTm90ZSByaWdodCBvZiBBcHA6IENvbnRpbnVlIHdpdGg8YnIvPmNhY2hlZCBkYXRhXG4gICAgRW50aXR5U3luY1NlcnZpY2UteCtBUEk6R2V0IHBheWxvYWQgSURcbiAgICBBUEktLT4-LUVudGl0eVN5bmNTZXJ2aWNlOlJlc3BvbnNlXG4gICAgRW50aXR5U3luY1NlcnZpY2UteCtDYWNoZTpQYXlsb2FkIElEIGNoYW5nZT9cbiAgICBDYWNoZS0tPj4tRW50aXR5U3luY1NlcnZpY2U6WWVzXG4gICAgRW50aXR5U3luY1NlcnZpY2UtPj4rQVBJOiBMb2FkIHJlZ2lzdGVyZWQgZW50aXRpZXNcbiAgICBBUEktLT4-LUVudGl0eVN5bmNTZXJ2aWNlOiBSZXNwb25zZVxuICAgIEVudGl0eVN5bmNTZXJ2aWNlLT4-K0NhY2hlOiBTYXZlIGVudGl0aWVzICsgcGF5bG9hZCBJRFxuICAgIE5vdGUgcmlnaHQgb2YgQXBwOiBDb250aW51ZSB3aXRoPGJyLz5mcmVzaCBkYXRhIiwibWVybWFpZCI6e30sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgQXBwXG4gICAgcGFydGljaXBhbnQgTW9kdWxlQVxuICAgIHBhcnRpY2lwYW50IE1vZHVsZUJcbiAgICBwYXJ0aWNpcGFudCBFbnRpdHlTeW5jU2VydmljZVxuICAgIHBhcnRpY2lwYW50IENhY2hlXG4gICAgcGFydGljaXBhbnQgQVBJXG4gICAgTW9kdWxlQS0-PitFbnRpdHlTeW5jU2VydmljZTogUmVnaXN0ZXIgZW50aXRpZXNcbiAgICBNb2R1bGVCLT4-K0VudGl0eVN5bmNTZXJ2aWNlOiBSZWdpc3RlciBlbnRpdGllc1xuICAgIEFwcC0-PitFbnRpdHlTeW5jU2VydmljZTogSW5pdFxuICAgIEVudGl0eVN5bmNTZXJ2aWNlLT4-K0NhY2hlOiBMb2FkIGVudGl0aWVzXG4gICAgQ2FjaGUtLT4-LUVudGl0eVN5bmNTZXJ2aWNlOiBSZXNwb25zZVxuICAgIEVudGl0eVN5bmNTZXJ2aWNlLT4-LUFwcDpEYXRhIHJlYWR5XG4gICAgTm90ZSByaWdodCBvZiBBcHA6IENvbnRpbnVlIHdpdGg8YnIvPmNhY2hlZCBkYXRhXG4gICAgRW50aXR5U3luY1NlcnZpY2UteCtBUEk6R2V0IHBheWxvYWQgSURcbiAgICBBUEktLT4-LUVudGl0eVN5bmNTZXJ2aWNlOlJlc3BvbnNlXG4gICAgRW50aXR5U3luY1NlcnZpY2UteCtDYWNoZTpQYXlsb2FkIElEIGNoYW5nZT9cbiAgICBDYWNoZS0tPj4tRW50aXR5U3luY1NlcnZpY2U6WWVzXG4gICAgRW50aXR5U3luY1NlcnZpY2UtPj4rQVBJOiBMb2FkIHJlZ2lzdGVyZWQgZW50aXRpZXNcbiAgICBBUEktLT4-LUVudGl0eVN5bmNTZXJ2aWNlOiBSZXNwb25zZVxuICAgIEVudGl0eVN5bmNTZXJ2aWNlLT4-K0NhY2hlOiBTYXZlIGVudGl0aWVzICsgcGF5bG9hZCBJRFxuICAgIE5vdGUgcmlnaHQgb2YgQXBwOiBDb250aW51ZSB3aXRoPGJyLz5mcmVzaCBkYXRhIiwibWVybWFpZCI6e30sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

    sequenceDiagram
        participant App
        participant ModuleA
        participant ModuleB
        participant EntitySyncService
        participant Cache
        participant API
        ModuleA->>+EntitySyncService: Register entities
        ModuleB->>+EntitySyncService: Register entities
        App->>+EntitySyncService: Init
        EntitySyncService->>+Cache: Load entities
        Cache-->>-EntitySyncService: Response
        EntitySyncService->>-App:Data ready
        Note right of App: Continue with<br/>cached data
        EntitySyncService-x+API:Get payload ID
        API-->>-EntitySyncService:Response
        EntitySyncService-x+Cache:Payload ID change?
        Cache-->>-EntitySyncService:Yes
        EntitySyncService->>+API: Load registered entities
        API-->>-EntitySyncService: Response
        EntitySyncService->>+Cache: Save entities + payload ID
        Note right of App: Continue with<br/>fresh data
