using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace ImageStorageAPI.Autorizacao
{
    public class FakeAuthHandler : AuthenticationHandler<FakeAuthOptions>
    {
        public string Token { get; set; } = @"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

        public FakeAuthHandler(IOptionsMonitor<FakeAuthOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var authorizationHeader = Context.Request.Headers["Authorization"];

            var identity = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, "usuarioTeste"),
                        new Claim(ClaimTypes.Role, "Teste"),
                    }, "Fake");

            var principal = new ClaimsPrincipal(identity);

            if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.FirstOrDefault().StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                var token = authorizationHeader.FirstOrDefault().Substring("Bearer ".Length).Trim();

                if (token.ToLower().Equals(Token.ToLower()))
                {                   
                    return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(principal, "Fake")));
                }
                else
                {
                    return Task.FromResult(AuthenticateResult.Fail("token invalido"));
                }
            }

            //return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(principal, "Fake")));
            return Task.FromResult(AuthenticateResult.Fail("token invalido"));
        }
    }

    public class FakeAuthOptions : AuthenticationSchemeOptions
    {
    }
}