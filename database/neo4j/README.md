# Neo4j Knowledge Graph — Dharohar AI

## Overview

Neo4j stores the knowledge graph representing relationships between heritage entities. This enables powerful graph traversal queries that reveal connections between places, people, traditions, events, and more.

## Planned Node Types

| Label | Description |
|-------|-------------|
| `Location` | Places, districts, cities |
| `Person` | Historical figures |
| `Heritage` | Heritage entities (generic) |
| `Period` | Historical periods |
| `Event` | Historical events |
| `Craft` | Traditional crafts |
| `Tradition` | Cultural traditions |
| `Festival` | Festivals |
| `Community` | Cultural communities |
| `Dynasty` | Historical dynasties |

## Planned Relationship Types

| Relationship | From → To | Description |
|--------------|-----------|-------------|
| `LOCATED_IN` | Location → Location | Geographic containment |
| `LOCATED_AT` | Heritage → Location | Where heritage is found |
| `ASSOCIATED_WITH` | Heritage → Location/Person | General association |
| `USESD_TECHNIQUE` | Craft → Craft | Craft technique relationships |
| `PART_OF` | Entity → Entity | Membership |
| `OCCURRED_DURING` | Event → Period | Temporal placement |
| `PRACTICED_BY` | Tradition → Community | Cultural practice |
| `INFLUENCED_BY` | Entity → Entity | Influence relationships |
| `BELONGED_TO` | Person → Dynasty/Community | Affiliation |
| `BUILT_BY` | Monument → Person/Dynasty | Construction attribution |

## Example Queries

```cypher
// Find all heritage connected to Patan
MATCH (p:Location {name: "Patan"})<-[:LOCATED_AT]-(h:Heritage)
RETURN h.name, h.category

// Find relationship chain: Patan → Patola → Double Ikat
MATCH path = (p:Location {name: "Patan"})-[*1..3]-(c:Craft)
RETURN path

// Find all connections for a heritage entity
MATCH (h:Heritage {name: "Rani ki Vav"})-[r]-(related)
RETURN type(r), related.name
```

## Setup

```bash
# Start Neo4j (using Docker)
docker run -d --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/your_password \
  neo4j:5
```
