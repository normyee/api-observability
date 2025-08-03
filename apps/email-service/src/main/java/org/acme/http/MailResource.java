package org.acme.http;

import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.mailing.ISendMail;
import org.acme.mailing.MailDto;

@Path("/mail")
public class MailResource {
    @Inject
    @Named("smtp")
    ISendMail mail;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response execute(MailDto message) {
        mail.execute(message);
        return Response.status(200).entity(ApiResponse.ok("Email was sent to " + message.getTo() + " successfully", null)).build();
    }
}
