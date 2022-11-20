import Error from "next/error";
import Link from "next/link";
import React from "react";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useAtom } from 'jotai'
import { favouritesAtom } from "../store";
import { useState } from "react";

function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
    fetcher
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList(current => current.filter(fav => fav != objectID));
      setShowAdded(false)
    } else {
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true)
    }

  }
  if (error) return <Error statusCode={404} />;
  if (data)
    return (
      <>
        <Card>
          {data.primaryImage && data.primaryImage.length && (
            <Card.Img src={data.primaryImage} />
          )}
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {data.objectDate ?? "N/A"}
              <br />
              <strong>Classification: </strong>
              <br />
              {data.classification ?? "N/A"}
              <strong>Medium: </strong>
              {data.medium ?? "N/A"}
              <br />
              <br />
              <strong>Artist: </strong>
              {data.artistDisplayName ? (
                <>
                  {data.artistDisplayName} (
                  <a
                    target_blank
                    href={data.artistWikidata_URL}
                    rel="noreferrer"
                  >
                    wiki
                  </a>
                  )
                </>
              ) : (
                "N/A"
              )}
              <br />
              <strong>Credit Line: </strong> {data.creditLine ?? "N/A"}
              <br />
              <strong>Dimensions: </strong>
              {data.dimensions ?? "N/A"}
            </Card.Text>
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>{`+ Favourite ${showAdded ? '(added)' : ''}`}</Button>
          </Card.Body>
        </Card>
      </>
    );
  return null;
}

export default ArtworkCardDetail;
