export class Service {
  public start() {
    const cmd = Deno.run({
      cmd: ["python3", "test.py"],
      stdout: "piped",
      stderr: "piped",
    });
  }
}
