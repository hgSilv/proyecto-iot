import asyncio
from asyncio import create_subprocess_exec, create_subprocess_shell
from asyncio.subprocess import PIPE
import subprocess


# def mosquitto_sub():
#     mosqProc = subprocess.run(['mosquitto_sub', '-h', 'broker.mqttdashboard.com', '-p', '1883', '-u', 'pollo', '-P', 'pollo', '-t', 'dogtrainer', '-i', 'linuxclient'],
#         stdout=subprocess.PIPE,
#         stderr=subprocess.STDOUT)

#     print(str(mosqProc))
#     while True:
#         out = mosqProc.stdout.read(1)
#         if out == '' and mosqProc.poll() != None:
#             break
#         if out != '':
#             sys.stdout.write(out)
#             sys.stdout.flush()
    
#     #print(str(mosqProc.stdout))
#     #print(str(mosqProc.stderr))


async def _read_stream(stream, callback):
    while True:
        line = await stream.readline()
        if line:
            callback(line)
        else:
            break


async def run(command):
    process = await create_subprocess_shell(*command, stdout=PIPE, stderr=PIPE, shell=True)

    await asyncio.wait(
        [
            _read_stream(
                process.stdout,
                lambda x: print(
                    "STDOUT: {}".format(x.decode("UTF8"))
                ),
            ),
            _read_stream(
                process.stderr,
                lambda x: print(
                    "STDERR: {}".format(x.decode("UTF8"))
                ),
            ),
        ]
    )

    await process.wait()

def myrun(cmd):
    """from
    http://blog.kagesenshi.org/2008/02/teeing-python-subprocesspopen-output.html
    """
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
                         stderr=subprocess.STDOUT)
    stdout = []
    while True:
        line = p.stdout.readline()
        stdout.append(line)
        print(line),
        if line == '' and p.poll() != None:
            break
    return ''.join(stdout)


async def main():
    await run("edge-impulse-linux-runner")


if __name__ == "__main__":
    #loop = asyncio.get_event_loop()
    #loop.run_until_complete(main())
    msg_mqtt = myrun("mosquitto_sub -h broker.mqttdashboard.com -p 1883 -u pollo -P pollo -t dogtrainer -i linuxclient -q 2")
    #msg_mqtt = myrun("edge-impulse-linux.runner")
    print(msg_mqtt)

