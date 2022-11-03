import Error from "next/error";
import Link from "next/link";
import React from "react";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../fetcher";

function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );
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
          </Card.Body>
        </Card>
      </>
    );
  return null;
}

export default ArtworkCardDetail;
